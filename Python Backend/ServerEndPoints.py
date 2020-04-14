from flask import Flask
from flask import request
from flask_cors import CORS
import json_vote_decoder
from PluralityVote import PluralityVote
from PluralityVoteRunner import PluralityVoteRunner
from RankedVote import RankedVote
from RankedVoteRunner import RankedVoteRunner
from ScoreVote import ScoreVote
from ScoreVoteRunner import ScoreVoteRunner
import json

app = Flask(__name__)

CORS(app)

# There are three end points on the backend of my server one for each electoral system


@app.route('/plurality', methods=['POST'])
def handle_plurality():
    json_data = request.get_json()

    # Split the json data down into usable components
    candidate_to_win = json_data["candidateToWin"]
    candidate_json = json_data["candidates"]
    edditingallowed = json_data["edditing"]

    # Get the vote breakdown e.i. the ballots and number of votes for each ballot
    # get_ballots_plurality returns a list of valid candidates as well
    vote_breakdown = json_vote_decoder.get_ballots_plurality(json_data["ballots"])

    if edditingallowed == "T":
        edit = True
    else:
        edit = False
    candidates = json_vote_decoder.populate_candidate(candidate_json, edit)

    valid_cands = vote_breakdown[1]

    # This function is used to create the list of non valid candidates
    not_valid_cands = json_vote_decoder.calculate_valids(valid_cands, candidates)

    # declare the vote object that will be used throughout the code
    vote = PluralityVote(candidates, vote_breakdown[0], not_valid_cands, valid_cands, candidate_to_win)

    # create and run the vote runner
    voterunner = PluralityVoteRunner(vote, edit)
    jsonreturn = voterunner.run_election()
    jsonreturn["datasent"] = json_data
    accjson = json.dumps(jsonreturn)
    return accjson


@app.route('/ranked', methods=['POST'])
def handle_ranked():
    json_data = request.get_json()

    # Split the json down into usable components
    candidate_json = json_data["candidates"]
    candidate_to_win = json_data["candidateToWin"]
    edditingallowed = json_data["edditing"]


    if edditingallowed == "T":
        edit = True
    else:
        edit = False
    candidates = json_vote_decoder.populate_candidate(candidate_json, edit)

    # Get the vote breakdown e.i. the ballots and number of votes for each ballot
    # get_ballots_plurality returns a list of valid candidates as well
    vote_breakdown = json_vote_decoder.get_ballots_ranked(json_data["ballots"])

    # This function is used to create the list of non valid candidates
    valid_cands = vote_breakdown[1]
    not_valid_cands = json_vote_decoder.calculate_valids(valid_cands, candidates)

    # declare the vote object that will be used throughout the code
    vote = RankedVote(candidates, vote_breakdown[0], not_valid_cands, valid_cands, candidate_to_win)

    # create and run the vote runner
    voterunner = RankedVoteRunner(vote, edit)
    jsonreturn = voterunner.run_election()
    jsonreturn["datasent"] = json_data
    accjson = json.dumps(jsonreturn)
    return accjson


@app.route('/score', methods=['POST'])
def handle_score():
    json_data = request.get_json()

    # Split the json down into usable components
    candidate_json = json_data["candidates"]
    candidate_to_win = json_data["candidateToWin"]

    candidates = json_vote_decoder.populate_candidate(candidate_json, False)

    vote_breakdown = json_vote_decoder.get_ballots_score(json_data["ballots"])
    valid_cands = vote_breakdown[1]
    not_valid_cands = json_vote_decoder.calculate_valids(valid_cands, candidates)
    vote = ScoreVote(candidates, vote_breakdown[0], not_valid_cands, valid_cands, candidate_to_win)

    voterunner = ScoreVoteRunner(vote, True)
    jsonreturn = voterunner.run_election()
    jsonreturn["datasent"] = json_data
    accjson = json.dumps(jsonreturn)

    return accjson


if __name__ == '__main__':
    app.run()
