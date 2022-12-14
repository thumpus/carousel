import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("works when you click on the arrows", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  //move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("doesn't show left arrow when on first image and doesn't show right arrow when on last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  //expect left arrow to not be there at the beginning
  expect(leftArrow).toHaveClass("hidden");
  
  //expect it to appear after going to the second image
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden");

  //expect the right arrow to disappear when on image 3
  fireEvent.click(rightArrow);
  expect(rightArrow).toHaveClass("hidden");

})

it("renders without crashing", function() {
  render(<Carousel />);
});

it("matches snapshot", function() {
    const {asFragment} = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
})