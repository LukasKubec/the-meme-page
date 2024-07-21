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

  it("copies meme to clipboard when copy button is clicked", async () => {
    const clipboardSpy = jest.spyOn(navigator.clipboard, "write");
    const mockImage = new Blob(["image content"], { type: "image/jpeg" });
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        blob: () => Promise.resolve(mockImage),
      })
    );

    render(<BottomButtons meme={mockMeme} setRandomMeme={jest.fn} />);

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /copy image to clipboard/i,
        })
      );
    });

    expect(clipboardSpy).toHaveBeenCalled();
  });

  it("should call setRandomMeme when RandomButton is clicked", () => {
    const meme: StaticImageWithAlt = {
      src: "test.jpg",
      alt: "test",
      extension: "jpg",
      height: 100,
      width: 100,
    };
    const setRandomMeme = jest.fn();

    render(<BottomButtons meme={meme} setRandomMeme={setRandomMeme} />);

    const randomButton = screen.getByText("Random meme!");
    act(() => {
      fireEvent.click(randomButton);
    });

    expect(setRandomMeme).toHaveBeenCalledTimes(1);
  });

  it("should display error message when copy to clipboard fails", async () => {
    const meme: StaticImageWithAlt = {
      src: "invalid.jpg",
      alt: "test",
      extension: "jpg",
      height: 100,
      width: 100,
    };
    const mockImage = new Blob(["image content"], { type: "image/jpeg" });
    global.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          blob: () => Promise.resolve(mockImage),
        })
    );

    const setRandomMeme = jest.fn();

    // mock copy to clipboard to fail
    jest.spyOn(navigator.clipboard, "write").mockImplementation(() => Promise.reject("Copy failed"));

    render(<BottomButtons meme={meme} setRandomMeme={setRandomMeme} />);

    const copyButton = screen.getByText("Copy");
    act(() => {
      fireEvent.click(copyButton);
    });

    const errorMessage = await screen.findByText(
      "Failed to copy image to clipboard."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("should reset error message when copy to clipboard succeeds after failure", async () => {
    const meme: StaticImageWithAlt = {
      src: "test.jpg",
      alt: "test",
      extension: "jpg",
      height: 100,
      width: 100,
    };
    const setRandomMeme = jest.fn();

    // Mock fetch to fail first and then succeed
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject("Fetch failed"))
      .mockImplementationOnce(() =>
        Promise.resolve({
          blob: () =>
            Promise.resolve(
              new Blob(["image content"], { type: "image/jpeg" })
            ),
        })
      );

    render(<BottomButtons meme={meme} setRandomMeme={setRandomMeme} />);

    const copyButton = screen.getByText("Copy");

    await act(async () => {
      fireEvent.click(copyButton);
    });

    const errorMessage = await screen.findByText(
      "Failed to copy image to clipboard."
    );
    expect(errorMessage).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(copyButton);
    });

    const successMessage = screen.queryByText(
      "Failed to copy image to clipboard."
    );
    expect(successMessage).toBeNull();
  });
});
