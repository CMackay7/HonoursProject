import json
import RankedBallot
from ScoreBallot import ScoreBallot
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


def get_ballots_score(ballot_data):
    vote_breakdown = []

    for vote in ballot_data:
        votes = int(ballot_data[vote])

        ballot = defaultdict(int)
        candidates_in_vote = vote.split("//")
        for candidate in candidates_in_vote:
            candidate_data = candidate.split(":")
            ballot[candidate_data[0]] = int(candidate_data[1])

        score_ballot = ScoreBallot(votes, ballot)
        vote_breakdown.append(score_ballot)
    return vote_breakdown
