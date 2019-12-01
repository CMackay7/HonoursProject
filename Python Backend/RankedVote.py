from Vote import Vote
class RankedVote(Vote):

    def __init__(self, candidates, voteBreakdown, backup_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates)

        print(self.voteBreakdown)

    def round_x(self, round):
        out = {}
        for vote in self.voteBreakdown:
            if len(vote.candidateRanking) >= round:
                cand = vote.candidateRanking[round]
                if cand in out:
                    out[vote.candidateRanking[round]] += vote.percentage
                else:
                    out[vote.candidateRanking[round]] = vote.percentage

        return out

#if __name__ == "__main__":
#    ranked = RankedVote(["dsfvds"], "sgrfv", "afesfsdv")

