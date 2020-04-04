from flask import Flask
from flask import request
#from flask_cors import CORS
import json_vote_decoder
from PluralityVote import PluralityVote
from PluralityVoteRunner import PluralityVoteRunner
from RankedVote import RankedVote
from RankedVoteRunner import RankedVoteRunner
from ScoreVote import ScoreVote
from ScoreVoteRunner import ScoreVoteRunner
import json

app = Flask(__name__)

#CORS(app)

@app.route('/plurality', methods=['POST'])
def handle_plurality():
    json_data = request.get_json()
    candidate_to_win = json_data["candidateToWin"]
    candidate_json = json_data["candidates"]
#    valid_candidates = json_data["valid_candidates"]


    vote_breakdown = json_vote_decoder.get_ballots_plurality(json_data["ballots"])
    edditingallowed = json_data["edditing"]
    if(edditingallowed == "T"):
        eddit = True
    else:
        eddit = False
    candidates = json_vote_decoder.populate_candidate(candidate_json, eddit)
    # todo change this
    valid_cands = vote_breakdown[1]
    not_valid_cands = json_vote_decoder.calculate_valids(valid_cands, candidates)
    vote = PluralityVote(candidates, vote_breakdown[0], not_valid_cands, valid_cands, candidate_to_win)


    voterunner = PluralityVoteRunner(vote, eddit)
    jsonreturn = voterunner.run_election()
    jsonreturn["datasent"] = json_data
    accjson = json.dumps(jsonreturn)
    return accjson

@app.route('/ranked', methods=['POST'])
def handle_ranked():
    json_data = request.get_json()

    candidate_json = json_data["candidates"]
    #valid_candidates = json_data["valid_candidates"]
    edditingallowed = json_data["edditing"]
    if(edditingallowed == "T"):
        eddit = True
    else:
        eddit = False
    candidates = json_vote_decoder.populate_candidate(candidate_json, eddit)
    candidate_to_win = json_data["candidateToWin"]
    #valid_cands, not_valid_cands = json_vote_decoder.calculate_valids(valid_candidates, candidates)

    vote_breakdown = json_vote_decoder.get_ballots_ranked(json_data["ballots"])
    valid_cands = vote_breakdown[1]
    not_valid_cands = json_vote_decoder.calculate_valids(valid_cands, candidates)
    vote = RankedVote(candidates, vote_breakdown[0], not_valid_cands, valid_cands, candidate_to_win)



    voterunner = RankedVoteRunner(vote, eddit)
    jsonreturn = voterunner.run_election()
    jsonreturn["datasent"] = json_data
    accjson = json.dumps(jsonreturn)
    return accjson

@app.route('/score', methods=['POST'])
def handle_score():
    json_data = request.get_json()

    candidate_json = json_data["candidates"]
    #valid_candidates = json_data["valid_candidates"]
    candidates = json_vote_decoder.populate_candidate(candidate_json, False)
    #valid_cands,
    candidate_to_win = json_data["candidateToWin"]

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
