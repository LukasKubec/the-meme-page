import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BottomButtons } from "./bottomButtons";
import { StaticImageWithAlt } from "../../programming memes";
import { act } from "react-dom/test-utils";

const downloadSpy = jest.fn();
jest.mock("react-use-downloader", () => {
  return {
    __esModule: true,
    default: () => ({
      download: jest.fn((src, filename) => downloadSpy(src, filename)),
    }),
  };
});

describe("BottomButtons Component", () => {
  beforeEach(() => {
    if (!navigator.clipboard?.write) {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          write: jest.fn(() => Promise.resolve()),
        },
        writable: true,
        configurable: true,
      });
    }

    if (!global.fetch) {
      global.fetch = jest.fn();
    }

    if (!global.ClipboardItem) {
      global.ClipboardItem = jest.fn();
    }

    jest
      .spyOn(navigator.clipboard, "write")
      .mockImplementation(() => Promise.resolve());
  });

  const mockMeme = {
    src: "/path/to/meme.png",
    alt: "Funny Meme",
    extension: "png",
    height: 100,
    width: 100,
  };

  it("renders download and copy path buttons when meme is provided", () => {
    render(<BottomButtons meme={mockMeme} setRandomMeme={jest.fn} />);
    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("calls download function with correct parameters when download button is clicked", async () => {
    render(<BottomButtons meme={mockMeme} setRandomMeme={jest.fn} />);

    act(() => {
      fireEvent.click(screen.getByText("Download"));
    });

    expect(downloadSpy).toHaveBeenCalledWith(
      mockMeme.src,
      `${mockMeme.alt}.${mockMeme.extension}`
    );
  });

  });
});
