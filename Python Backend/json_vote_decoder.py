import json
import RankedBallot
from collections import defaultdict


def get_ballots_plurality(ballot_data):
    vote_breakdown = defaultdict(int)

    for vote in ballot_data:
        vote_breakdown += int(vote[ballot_data])


def get_ballots_ranked(ballot_data):
    counter = 1
    vote_breakdown = []
    for vote in ballot_data:
        votes = int(ballot_data[vote])

        ballot = defaultdict(str)
        # todo: change this so it matches to an actual candidate
        for candidate in vote:
            ballot[counter] = candidate
            counter += 1

        ranked_ballot = RankedBallot.RankedBallot(votes, ballot)
        vote_breakdown.append(ranked_ballot)