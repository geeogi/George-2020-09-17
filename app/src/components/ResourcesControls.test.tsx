import { render } from "@testing-library/react";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import { notifyError } from "../core/error";
import { ResourcesControls } from "./ResourcesControls";

jest.mock("../core/error", () => ({
  notifyError: jest.fn(),
}));

describe("ResourceControls", () => {
  it("calls search handler on search input", () => {
    const onSearch = jest.fn();
    const onUpload = jest.fn();
    const searchTerm = "";

    const { getByPlaceholderText } = render(
      <ResourcesControls
        onSearch={onSearch}
        onUpload={onUpload}
        searchTerm={searchTerm}
      />
    );

    Simulate.change(getByPlaceholderText("Search documents..."), {
      target: ({ value: "apple" } as any) as EventTarget,
    });

    expect(onSearch).toBeCalledWith("apple");
  });

  it("sanitises search input", () => {
    const onSearch = jest.fn();
    const onUpload = jest.fn();
    const searchTerm = "";

    const { getByPlaceholderText } = render(
      <ResourcesControls
        onSearch={onSearch}
        onUpload={onUpload}
        searchTerm={searchTerm}
      />
    );

    Simulate.change(getByPlaceholderText("Search documents..."), {
      target: ({ value: "<script>" } as any) as EventTarget,
    });

    expect(onSearch).not.toBeCalledWith("<script>");
    expect(onSearch).toBeCalledWith("&lt;script&gt;");
  });

  it("calls onUpload when file is uploaded and shows Spinner", async () => {
    const onSearch = jest.fn();
    const onUpload = jest.fn().mockImplementation(() => Promise.resolve());
    const searchTerm = "";

    const {
      getByLabelText,
      findByTestId,
      getByTestId,
      findByLabelText,
    } = render(
      <ResourcesControls
        onSearch={onSearch}
        onUpload={onUpload}
        searchTerm={searchTerm}
      />
    );

    const mockFile = new File(["( ͡° ͜ʖ ͡°)"], "moon.png", { type: "image/png" });

    Simulate.change(getByLabelText("UPLOAD"), {
      target: ({ files: [mockFile] } as any) as EventTarget,
    });

    expect(onUpload).toBeCalledWith(mockFile);

    /**
     * Spinner is shown
     */
    await findByTestId("Spinner");

    /**
     * Spinner is then hidden since promise is resolved
     */
    await findByLabelText("UPLOAD");
    expect(() => getByTestId("Spinner")).toThrow();
  });

  it("notifies user when errors occurs during upload", () => {
    const mockError = new Error("File size exceeds 10MB");

    const onSearch = jest.fn();
    const onUpload = jest.fn().mockImplementation(() => {
      throw mockError;
    });
    const searchTerm = "";

    const { getByLabelText, getByTestId } = render(
      <ResourcesControls
        onSearch={onSearch}
        onUpload={onUpload}
        searchTerm={searchTerm}
      />
    );

    const mockFile = new File(["( ͡° ͜ʖ ͡°)"], "moon.png", { type: "image/png" });

    Simulate.change(getByLabelText("UPLOAD"), {
      target: ({ files: [mockFile] } as any) as EventTarget,
    });

    /**
     * Error is shown to user
     */
    expect(notifyError).toHaveBeenCalledWith(mockError);

    /**
     * Spinner is not spinning
     */
    expect(() => getByTestId("Spinner")).toThrow();
  });
});
