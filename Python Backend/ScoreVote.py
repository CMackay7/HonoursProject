from Vote import Vote
import copy
from collections import defaultdict
import RankedBallot
from itertools import combinations
import Graph

class ScoreVote(Vote):

    # Candidates is the only one of these which contains the actual objects do not modify or copy
    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, valid_candidates[0])


    def sum_vote(self):
        vote_breakdown = defaultdict(int)
        for candidate in self.valid_candidates:

            for ballot in self.voteBreakdown_copy:
                if candidate in ballot.candidateScores:
                    vote_breakdown[candidate] += ballot.percentage * ballot.candidateScores[candidate]

        return vote_breakdown
