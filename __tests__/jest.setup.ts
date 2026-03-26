import "@testing-library/jest-dom";

import { mockPersons } from "@tests/__mocks__/persons.mock";

jest.mock("@/constants/persons", () => ({
  __esModule: true,
  default: mockPersons,
}));
