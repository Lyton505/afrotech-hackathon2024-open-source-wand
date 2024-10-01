// logic
// given a repo:
// get the # of stars
//

export default function totalImpact(stars, userCommitCount, totalCommitCount) {
  const impact = (userCommitCount / totalCommitCount) * 100;
  // console.log(
    // "Commit Contribution: " + impact.toFixed(2) + "% of total commits",
  // );
  return [stars, impact];
}
