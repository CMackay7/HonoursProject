
import RankedBallot
from ScoreBallot import ScoreBallot
from collections import defaultdict
from Candidate import Candidate

# Get the data from a plurality ballot
def get_ballots_plurality(ballot_data):
    vote_breakdown = defaultdict(int)
    candidates = set()

    for vote in ballot_data:
        if not(vote in candidates):
            candidates.add(vote)
        vote_breakdown[vote] += int(ballot_data[vote])

    # Returns the vote breakdown and the candidates that were sent to the system
    return vote_breakdown, candidates

# Return the data from a ranked vote
def get_ballots_ranked(ballot_data):
    candidates = set()
    vote_breakdown = []
    for vote in ballot_data:
        counter = 1
        votes = int(ballot_data[vote])

        ballot = defaultdict(str)
        # When the data is sent to the system the data is split by double slashes to need to sepearate the data
        candidates_in_vote = vote.split("//")

        for candidate in candidates_in_vote:
            if not (candidate in candidates):
                # Add candidate to the list of candidates
                candidates.add(candidate)
            # it uses counter because the key needs to be the round for later processing
            ballot[counter] = candidate
            counter += 1

        # Create ballot object
        ranked_ballot = RankedBallot.RankedBallot(votes, ballot)
        vote_breakdown.append(ranked_ballot)
    return vote_breakdown, candidates

# Return the data from a score vote
def get_ballots_score(ballot_data):
    vote_breakdown = []
    candidates = set()
    for vote in ballot_data:
        votes = int(ballot_data[vote])

        ballot = defaultdict(int)
        # split the data
        candidates_in_vote = vote.split("//")
        for candidate in candidates_in_vote:
            candidate_data = candidate.split(":")
            if not (candidate_data[0] in candidates):
                candidates.add(candidate_data[0])

            # First element is the candidate name second is the score they were assigned
            ballot[candidate_data[0]] = int(candidate_data[1])

        #Create score ballot object
        score_ballot = ScoreBallot(votes, ballot)
        vote_breakdown.append(score_ballot)
    return vote_breakdown, candidates


# gets the candidate data from the json
def populate_candidate(candidates_in, edditable):
    candidates = []
    #loop through the candidates in json and add all the data
    for candidate in candidates_in:
        candidate_name = candidate["name"]
        candidate_similarities = candidate["similarity"]
        # All that is needed to decalre a new candidate is the name of the candidate and their similarity
        # in the dictionary form
        candidate_to_add = Candidate(candidate_name)
        if edditable is True:
            candidate_to_add.set_similarity(candidate_similarities)
        candidates.append(candidate_to_add)

    return candidates


    # create the list of valid candidates
def calculate_valids(valid_candidates, candidates):

    # Also need to find the candidates that are not valid
    not_valid_candidates = []
    for candidate in candidates:
        # if the candidate is not in the valid list then add it to the not valid list
        if candidate.CandidateName not in valid_candidates:
            not_valid_candidates.append(candidate.CandidateName)

    # Return both VALID CANDIDATES ARE FIRST
    return not_valid_candidates


def get_ballots(ballot_data):
    vote_breakdown = defaultdict(int)

    for vote in ballot_data:
        vote_breakdown += int(vote[ballot_data])
