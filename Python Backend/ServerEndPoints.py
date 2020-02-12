from flask import Flask
from flask import request
import json_vote_decoder
from PluralityVote import PluralityVote
from PluralityVoteRunner import PluralityVoteRunner
from RankedVote import RankedVote
from RankedVoteRunner import RankedVoteRunner
from ScoreVote import ScoreVote
from ScoreVoteRunner import ScoreVoteRunner
import json

app = Flask(__name__)


@app.route('/plurality', methods=['POST'])
def handle_plurality():
    json_data = request.get_json()

    candidate_json = json_data["candidates"]
    valid_candidates = json_data["valid_candidates"]
    candidates = json_vote_decoder.populate_candidate(candidate_json)
    valid_cands, not_valid_cands = json_vote_decoder.calculate_valids(valid_candidates, candidates)

    vote_breakdown = json_vote_decoder.get_ballots_plurality(json_data["ballots"])
    vote = PluralityVote(candidates, vote_breakdown, not_valid_cands, valid_cands)

    voterunner = PluralityVoteRunner(vote, True)
    jsonreturn = voterunner.run_election()
    accjson = json.dumps(jsonreturn)
    return accjson

@app.route('/ranked', methods=['POST'])
def handle_ranked():
    json_data = request.get_json()

    candidate_json = json_data["candidates"]
    valid_candidates = json_data["valid_candidates"]
    candidates = json_vote_decoder.populate_candidate(candidate_json)
    valid_cands, not_valid_cands = json_vote_decoder.calculate_valids(valid_candidates, candidates)

    vote_breakdown = json_vote_decoder.get_ballots_ranked(json_data["ballots"])
    vote = RankedVote(candidates, vote_breakdown, not_valid_cands, valid_cands)

    voterunner = RankedVoteRunner(vote, True)
    jsonreturn = voterunner.run_election()
    accjson = json.dumps(jsonreturn)
    return accjson

@app.route('/score', methods=['POST'])
def handle_score():
    json_data = request.get_json()

    candidate_json = json_data["candidates"]
    valid_candidates = json_data["valid_candidates"]
    candidates = json_vote_decoder.populate_candidate(candidate_json)
    valid_cands, not_valid_cands = json_vote_decoder.calculate_valids(valid_candidates, candidates)

    vote_breakdown = json_vote_decoder.get_ballots_score(json_data["ballots"])
    vote = ScoreVote(candidates, vote_breakdown, not_valid_cands, valid_cands)

    voterunner = ScoreVoteRunner(vote, True)
    jsonreturn = voterunner.run_election()
    accjson = json.dumps(jsonreturn)
    return accjson

if __name__ == '__main__':
    app.run()