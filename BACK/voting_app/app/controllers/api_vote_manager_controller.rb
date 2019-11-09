class ApiVoteManagerController < ActionController::API
  def begin_session
    agent = User.where(email: params[:email])[0]
    voter = Voter.find(params[:voter])
    session_vote = SessionVote.new 
    session_vote.created_at = DateTime.new
    session_vote.status_vote = 0
    session_vote.voter = voter
    session_vote.user = agent

    if(session_vote.save)
      render json: { :session_vote => session_vote._id, :agent => agent._id, :voter => voter }
    end
  end

  def end_session
    # 
  end
end
