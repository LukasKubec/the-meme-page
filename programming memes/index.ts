"use server";
import { StaticImageData } from "next/image";

interface DefaultImageExport {
  default: StaticImageData;
}

export interface StaticImageWithAlt extends StaticImageData {
  alt: string;
  extension: string;
}

const addAltAndExtension = (image: StaticImageData): StaticImageWithAlt => {
  // example alt from image name: "programming_meme" => "programming meme"
  const alt =
    image.src.split("/").pop()?.split(".")[0].replace(/_/g, " ") || "";
  const extension = image.src.split(".").pop() || "";
  return {
    ...image,
    alt,
    extension,
  };
};

const valuesIsStaticImageData = (
  value: StaticImageData | unknown
): value is StaticImageData => (value as StaticImageData).src !== undefined;

const valuesAreModulesWithDefault = (
  values: unknown[]
): values is DefaultImageExport[] => {
  return values.every((value) => {
    return (
      (value as DefaultImageExport).default !== undefined &&
      valuesIsStaticImageData((value as DefaultImageExport).default)
    );
  });
};

const mapDefaultExportToStaticImage = (
  values: DefaultImageExport[]
): StaticImageData[] => values.map((value) => value.default);

export const loadMemes = async () => {
  const context = require.context("./", false, /\.(png|jpe?g|svg|gif)$/);
  const keys = context.keys();
  const values = keys.map(context);
  if (valuesAreModulesWithDefault(values)) {
    return mapDefaultExportToStaticImage(values).map(addAltAndExtension);
  }
};
