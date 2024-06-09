import { updateLeaderBoard } from "@/contexts/leader-board/utils/update-leader-board";

describe("updateLeaderBoard", () => {
  const leaderBoardData = [
    { name: "John", score: 100 },
    { name: "Jane", score: 200 },
    { name: "Alice", score: 150 },
  ];

  it("should add the score to an empty leader board", () => {
    const score = { name: "Bob", score: 250 };
    const result = updateLeaderBoard({ score, leaderBoardData: [] });
    const expectedResult = [score];

    expect(result).toEqual(expectedResult);
  });

  it("should add the score to the leader board and sort it in descending order", () => {
    const score = { name: "Bob", score: 250 };
    const result = updateLeaderBoard({ score, leaderBoardData });
    const expectedResult = [
      {
        name: "Bob",
        score: 250,
      },
      {
        name: "Jane",
        score: 200,
      },
      {
        name: "Alice",
        score: 150,
      },
      {
        name: "John",
        score: 100,
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should update the score for an existing player in the leader board", () => {
    const score = { name: "Jane", score: 300 };
    const result = updateLeaderBoard({ score, leaderBoardData });
    const expectedResult = [
      {
        name: "Jane",
        score: 300,
      },
      {
        name: "Alice",
        score: 150,
      },
      {
        name: "John",
        score: 100,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
