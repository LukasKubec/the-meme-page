import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BottomButtons } from "./bottomButtons";

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
    if (typeof navigator.clipboard === 'undefined') {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: () => {},
        },
        writable: true,
      });
    }

    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve());
  });

  const mockMeme = {
    src: "/path/to/meme.png",
    alt: "Funny Meme",
    extension: "png",
    height: 100, // Example value, adjust as needed
    width: 100, // Example value, adjust as needed
  };

  it("renders download and copy path buttons when meme is provided", () => {
    render(<BottomButtons meme={mockMeme} />);
    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Copy path to clipboard")).toBeInTheDocument();
  });

  it("does not render buttons when meme is not provided", () => {
    render(<BottomButtons />);
    expect(screen.queryByText("Download")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Copy path to clipboard")
    ).not.toBeInTheDocument();
  });

  it("calls download function with correct parameters when download button is clicked", async () => {
    render(<BottomButtons meme={mockMeme} />);
    fireEvent.click(screen.getByText("Download"));
    expect(downloadSpy).toHaveBeenCalledWith(
      mockMeme.src,
      `${mockMeme.alt}.${mockMeme.extension}`
    );
  });

  it("copies meme path to clipboard when copy path button is clicked", async () => {
    const clipboardSpy = jest.spyOn(navigator.clipboard, "writeText");
    render(<BottomButtons meme={mockMeme} />);
    fireEvent.click(screen.getByText("Copy path to clipboard"));
    expect(clipboardSpy).toHaveBeenCalledWith(
      `${window.location.origin}${mockMeme.src}`
    );
  });
});
