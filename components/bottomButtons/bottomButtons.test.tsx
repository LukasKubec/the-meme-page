import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BottomButtons } from "./bottomButtons";
import { StaticImageWithAlt } from "../../programming memes";
import { act } from "react-dom/test-utils";

const downloadSpy = jest.fn();
jest.mock("react-use-downloader", () => ({
  __esModule: true,
  default: () => ({
    download: jest.fn((src, filename) => downloadSpy(src, filename)),
  }),
}));

describe("BottomButtons Component", () => {
  const mockMeme: StaticImageWithAlt = {
    src: "/path/to/meme.png",
    alt: "Funny Meme",
    extension: "png",
    height: 100,
    width: 100,
  };
  let clipboardSpy: jest.SpyInstance;

  beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
      value: {
        write: jest.fn(() => Promise.resolve()),
      },
      writable: true,
      configurable: true,
    });

    global.fetch = jest.fn().mockResolvedValue({
      blob: () =>
        Promise.resolve(new Blob(["image content"], { type: "image/jpeg" })),
    });

    global.ClipboardItem = jest.fn();

    clipboardSpy = jest.spyOn(navigator.clipboard, "write");
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  const renderBottomButtons = (
    meme: StaticImageWithAlt,
    setRandomMemeMock?: () => void | jest.Mock
  ) =>
    render(
      <BottomButtons
        meme={meme}
        setRandomMeme={setRandomMemeMock || jest.fn()}
      />
    );

  it("renders download and copy path buttons when meme is provided", () => {
    renderBottomButtons(mockMeme);
    expect(screen.getByText("Download")).toBeInTheDocument();
    expect(screen.getByText("Copy")).toBeInTheDocument();
  });

  it("calls download function with correct parameters when download button is clicked", async () => {
    renderBottomButtons(mockMeme);

    await act(async () => {
      fireEvent.click(screen.getByText("Download"));
    });

    expect(downloadSpy).toHaveBeenCalledWith(
      mockMeme.src,
      `${mockMeme.alt}.${mockMeme.extension}`
    );
  });

  it("copies meme to clipboard when copy button is clicked", async () => {
    renderBottomButtons(mockMeme);

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /copy image to clipboard/i })
      );
    });

    expect(clipboardSpy).toHaveBeenCalled();
  });

  it("should call setRandomMeme when RandomButton is clicked", () => {
    const setRandomMemeMock = jest.fn();
    renderBottomButtons(mockMeme, setRandomMemeMock);

    const randomButton = screen.getByText("Random meme!");
    act(() => {
      fireEvent.click(randomButton);
    });

    expect(setRandomMemeMock).toHaveBeenCalledTimes(1);
  });

  it("should display error message when copy to clipboard fails", async () => {
    clipboardSpy.mockRejectedValueOnce(new Error("Copy failed"));
    renderBottomButtons(mockMeme);
    act(() => {
      fireEvent.click(screen.getByText("Copy"));
    });
    await waitFor(() =>
      expect(
        screen.getByText("Failed to copy image to clipboard.")
      ).toBeInTheDocument()
    );
  });

  it("should reset error message when copy to clipboard succeeds after failure", async () => {
    clipboardSpy
      .mockRejectedValueOnce(new Error("Copy failed"))
      .mockResolvedValueOnce({});

    renderBottomButtons(mockMeme);

    // Attempt to copy, expect failure
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /copy image to clipboard/i })
      );
    });
    await waitFor(() =>
      expect(
        screen.getByText("Failed to copy image to clipboard.")
      ).toBeInTheDocument()
    );

    // Attempt to copy again, expect success
    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", { name: /copy image to clipboard/i })
      );
    });
    await waitFor(() =>
      expect(
        screen.queryByText("Failed to copy image to clipboard.")
      ).toBeNull()
    );
  });
});
