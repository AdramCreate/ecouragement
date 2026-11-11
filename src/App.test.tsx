import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("eCouragement", () => {
  it("shows 25 blips to discover", () => {
    render(<App />);

    expect(
      screen.getAllByRole("button", { name: "Reveal an ecouragement" }),
    ).toHaveLength(25);
  });

  it("reveals a positive message when a blip is activated", () => {
    render(<App />);
    fireEvent.click(
      screen.getAllByRole("button", { name: "Reveal an ecouragement" })[0],
    );

    expect(
      screen.getByText("You are capable of more than you know."),
    ).toBeInTheDocument();
  });

  it("supports keyboard activation", async () => {
    const user = userEvent.setup();
    render(<App />);
    const firstBlip = screen.getAllByRole("button", {
      name: "Reveal an ecouragement",
    })[0];

    firstBlip.focus();
    expect(firstBlip).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(
      screen.getByText("You are capable of more than you know."),
    ).toBeInTheDocument();
  });
});
