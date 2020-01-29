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

    def mean_vote(self):
        vote_breakdown = defaultdict(float)
        sum_breakdown = self.sum_vote()
        ballot_totals = self.number_of_ballots_appeared_on()

        for candidate in sum_breakdown:
            vote_breakdown[candidate] = round(sum_breakdown[candidate] / ballot_totals[candidate], 2)

        return vote_breakdown

    def number_of_ballots_appeared_on(self):
        return_dict = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            for candidate in ballot.candidateScores:
                return_dict[candidate] += ballot.percentage

        return return_dict
