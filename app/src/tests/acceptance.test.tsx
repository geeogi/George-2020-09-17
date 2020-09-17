import { render } from "@testing-library/react";
import nock from "nock";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import App from "../components/App";
import { API_BASE_URL } from "../config/constants";

const MOCK_HEADERS = { "Access-Control-Allow-Origin": "*" };

const MOCK_ALL_RESOURCES = [
  { id: "id-1", name: "Green", size: 10000 },
  { id: "id-2", name: "Red", size: 25000 },
  { id: "id-3", name: "Blue", size: 500 },
];

const MOCK_SEARCH_RESOURCES_ONE = [
  { id: "id-2", name: "Red", size: 25000 },
  { id: "id-56", name: "Turquoise", size: 5000 },
];

const MOCK_SEARCH_RESOURCES_TWO = [
  { id: "id-45", name: "Brown", size: 24000 },
  { id: "id-78", name: "Beige", size: 24500 },
];

describe("Page load", () => {
  it("renders upload button, search bar and resources returned by API", async () => {
    /**
     * One HTTP request expected on load
     */
    nock(API_BASE_URL)
      .get("/resources")
      .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS);

    const { findByText, getByText, getByPlaceholderText } = render(<App />);

    /**
     * Assert rendered template
     */
    getByText("UPLOAD");
    getByPlaceholderText("Search documents...");

    for (let resource of MOCK_ALL_RESOURCES) {
      await findByText(resource.name);
      await findByText(`${Math.round(resource.size / 1024)}kb`);
    }
  });
});

describe("Search bar", () => {
  beforeEach(() => {
    nock(API_BASE_URL)
      .get("/resources")
      .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS);
  });

  it("calls search endpoint with search term and renders returned resources", async () => {
    /**
     * Two HTTP requests expected for two search inputs
     */
    nock(API_BASE_URL)
      .get("/resources/search?term=apple")
      .reply(200, MOCK_SEARCH_RESOURCES_ONE, MOCK_HEADERS)
      .get("/resources/search?term=orange")
      .reply(200, MOCK_SEARCH_RESOURCES_TWO, MOCK_HEADERS);

    const { findByText, getByPlaceholderText } = render(<App />);

    const searchInput = getByPlaceholderText("Search documents...");

    /**
     * Simulate first search
     */
    Simulate.change(searchInput, {
      target: ({ value: "apple" } as any) as EventTarget,
    });
    for (let resource of MOCK_SEARCH_RESOURCES_ONE) {
      await findByText(resource.name);
      await findByText(`${Math.round(resource.size / 1024)}kb`);
    }

    /**
     * Simulate second search
     */
    Simulate.change(searchInput, {
      target: ({ value: "orange" } as any) as EventTarget,
    });
    for (let resource of MOCK_SEARCH_RESOURCES_TWO) {
      await findByText(resource.name);
      await findByText(`${Math.round(resource.size / 1024)}kb`);
    }
  });

  it("fetches all resources when search box is cleared", async () => {
    /**
     * One HTTP requests expected for search and another expected for the refresh
     */
    nock(API_BASE_URL)
      .get("/resources/search?term=apple")
      .reply(200, MOCK_SEARCH_RESOURCES_ONE, MOCK_HEADERS)
      .get("/resources")
      .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS);

    const { findByText, getByPlaceholderText } = render(<App />);

    const searchInput = getByPlaceholderText("Search documents...");

    /**
     * Simulate search
     */
    Simulate.change(searchInput, {
      target: ({ value: "apple" } as any) as EventTarget,
    });
    for (let resource of MOCK_SEARCH_RESOURCES_ONE) {
      await findByText(resource.name);
      await findByText(`${Math.round(resource.size / 1024)}kb`);
    }

    /**
     * Simulate search box cleared
     */
    Simulate.change(searchInput, {
      target: ({ value: "" } as any) as EventTarget,
    });
    for (let resource of MOCK_ALL_RESOURCES) {
      await findByText(resource.name);
      await findByText(`${Math.round(resource.size / 1024)}kb`);
    }
  });
});

describe("Delete resource", () => {
  beforeEach(() => {
    nock(API_BASE_URL)
      .get("/resources")
      .reply(200, [{ id: "id-1", name: "Green", size: 10000 }], MOCK_HEADERS)
      .get("/resources")
      .reply(200, [], MOCK_HEADERS);
  });

  it("deletes resource", async () => {
    /**
     * HTTP DELETE request expected
     */
    nock(API_BASE_URL)
      .options("/resource/id-1")
      .reply(200, MOCK_HEADERS)
      .delete("/resource/id-1")
      .reply(200, MOCK_HEADERS);

    const { findByText } = render(<App />);

    const deleteButton = await findByText("delete");
    Simulate.click(deleteButton);
  });
});

describe("Upload resource", () => {
  beforeEach(() => {
    nock(API_BASE_URL)
      .get("/resources")
      .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS);
  });

  it("creates a resource from an image file", () => {
    const MOCK_FILE = new File(["( ͡° ͜ʖ ͡°)"], "moon.png", { type: "image/png" });

    /**
     * HTTP POST request expected with body containing multipart form matching file content
     */
    nock(API_BASE_URL)
      .post("/resource", (body) =>
        body.includes(
          [
            "form-data; ",
            'name="file"; ',
            'filename="moon.png"\r\n',
            "Content-Type: image/png\r\n\r\n( ͡° ͜ʖ ͡°)",
          ].join("")
        )
      )
      .reply(200);

    const { getByLabelText } = render(<App />);

    const imageInput = getByLabelText("UPLOAD");
    Simulate.change(imageInput, {
      target: ({ files: [MOCK_FILE] } as any) as EventTarget,
    });
  });
});
