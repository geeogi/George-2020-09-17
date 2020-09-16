import { fireEvent, render } from "@testing-library/react";
import nock from "nock";
import React from "react";
import App from "../components/App";

const MOCK_HEADERS = { "Access-Control-Allow-Origin": "*" };

const MOCK_ALL_RESOURCES = [
  { id: "1", name: "Green", size: 10000 },
  { id: "2", name: "Red", size: 25000 },
  { id: "3", name: "Blue", size: 500 },
];

const MOCK_SEARCH_RESOURCES = [
  { id: "2", name: "Red", size: 25000 },
  { id: "56", name: "Turquoise", size: 5000 },
];

test("renders upload button, search bar and resources returned by API", async () => {
  nock("http://localhost:3001")
    .get("/resources")
    .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS);

  const { getByText, findByText, getByPlaceholderText } = render(<App />);

  getByText("UPLOAD");
  getByPlaceholderText("Search documents...");

  for (let resource of MOCK_ALL_RESOURCES) {
    await findByText(resource.name);
    await findByText(`${Math.round(resource.size / 1024)}kb`);
  }
});

test("search input calls search endpoint and renders resources returned by search API", async () => {
  nock("http://localhost:3001")
    .get("/resources")
    .reply(200, MOCK_ALL_RESOURCES, MOCK_HEADERS)
    .get("/resources/search?term=hello")
    .reply(200, MOCK_SEARCH_RESOURCES, MOCK_HEADERS);

  const { findByText, getByPlaceholderText } = render(<App />);

  const searchInput = getByPlaceholderText("Search documents...");
  fireEvent.change(searchInput, { target: { value: "hello" } });

  for (let resource of MOCK_SEARCH_RESOURCES) {
    await findByText(resource.name);
    await findByText(`${Math.round(resource.size / 1024)}kb`);
  }
});
