from Vote import Vote
from collections import defaultdict



class ScoreVote(Vote):

    # Candidates is the only one of these which contains the actual objects do not modify or copy
    def __init__(self, candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win):
        super().__init__(candidates, voteBreakdown, backup_candidates, valid_candidates, candidate_to_win)

    ###################################################################################################################
    #                                              VOTING SYSTEMS                                                     #
    ###################################################################################################################

    # Sum vote simply sums the (score * percentage)
    def sum_vote(self):
        vote_breakdown = defaultdict(int)
        for candidate in self.valid_candidates:

            for ballot in self.voteBreakdown_copy:
                if candidate in ballot.candidateScores:
                    vote_breakdown[candidate] += ballot.percentage * ballot.candidateScores[candidate]

        return vote_breakdown

    # Mean vote works out the mean score for each candidate
    def mean_vote(self):
        vote_breakdown = defaultdict(float)
        sum_breakdown = self.sum_vote()
        ballot_totals = self.number_of_ballots_appeared_on()

        for candidate in sum_breakdown:
            vote_breakdown[candidate] = round(sum_breakdown[candidate] / ballot_totals[candidate], 2)

        return vote_breakdown

    # Star vote runs a sum vote and selects the highest two candidates as finalists
    # next it will loop through every ballot and find the cnadidate who is ranked highest on the most ballots
    def star_vote(self):
        return_dict = defaultdict(int)

        # process of selecting the two highest winners in sum vote
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

    ###################################################################################################################
    #                                              HELPER FUNCTIONS                                                   #
    ###################################################################################################################

    def number_of_ballots_appeared_on(self):
        return_dict = defaultdict(int)
        for ballot in self.voteBreakdown_copy:
            for candidate in ballot.candidateScores:
                return_dict[candidate] += ballot.percentage

        return return_dict

    # This function converts the votes each option got to a percentage
    def find_total_percentage(self, results):
        total_votes = 0
        converted_votes = {}
        for candidate in results:
            total_votes += results[candidate]

        for candidate in results:
            percentage_won = (results[candidate] / total_votes) * 100
            # Want the values as an int
            added_votes = round(percentage_won, 0)
            converted_votes[candidate] = added_votes

        return converted_votes

    # finds the highest two values
    def find_highest_two(self, breakdown):
        highest = (max(breakdown, key=breakdown.get))
        del breakdown[highest]
        secondhighest = (max(breakdown, key=breakdown.get))

        return highest, secondhighest

