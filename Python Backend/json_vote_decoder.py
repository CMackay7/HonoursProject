import json
import RankedBallot
from collections import defaultdict


def get_ballots_plurality(ballot_data):
    vote_breakdown = defaultdict(int)

    for vote in ballot_data:
        vote_breakdown[vote] += int(ballot_data[vote])

    return vote_breakdown


def get_ballots_ranked(ballot_data):

    vote_breakdown = []
    for vote in ballot_data:
        counter = 1
        votes = int(ballot_data[vote])

        ballot = defaultdict(str)
        candidates_in_vote = vote.split("//")
        # todo: change this so it matches to an actual candidate
        for candidate in candidates_in_vote:

            # it uses counter because the key needs to be the round for later processing
            ballot[counter] = candidate
            counter += 1

        ranked_ballot = RankedBallot.RankedBallot(votes, ballot)
        vote_breakdown.append(ranked_ballot)
    return vote_breakdown
