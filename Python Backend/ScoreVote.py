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

    def star_vote(self):
        return_dict = defaultdict(int)

        sum_of_votes = self.sum_vote()
        highest_two = self.find_highest_two(sum_of_votes)
        first_candidate = highest_two[0]
        second_candidate = highest_two[1]

        for ballot in self.voteBreakdown_copy:
            if first_candidate in ballot.candidateScores and second_candidate in ballot.candidateScores:
                if ballot.candidateScores[first_candidate] > ballot.candidateScores[second_candidate]:
                    return_dict[first_candidate] += ballot.percentage
                else:
                    return_dict[second_candidate] += ballot.percentage
            elif first_candidate in ballot.candidateScores:
                return_dict[first_candidate] += ballot.percentage
            elif second_candidate in ballot.candidateScores:
                return_dict[second_candidate] += ballot.percentage

        return self.find_total_percentage(return_dict)

    def find_total_percentage(self, results):
        total_votes = 0
        converted_votes = {}
        for candidate in results:
            total_votes += results[candidate]

        for candidate in results:
            percentage_won = (results[candidate] / total_votes) * 100
            added_votes = round(percentage_won, 0)
            converted_votes[candidate] = added_votes

        return converted_votes

    # todo move this into vote so it can be used by every class
    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return highest, secondhighest

