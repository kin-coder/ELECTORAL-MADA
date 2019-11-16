class SurveyController < ApplicationController
    def all
        surveys = Survey.all
        render json: surveys
    end

    def show
        survey = Survey.find(params[:id])
        render json: survey
    end

    def create
        voter = Voter.find(params[:voter])
        candidate = Candidate.find(params[:candidate])

        survey = Survey.new
        survey.title = params[:title]
        survey.description = params[:description]
        survey.media = params[:media]
        survey.voter = voter
        survey.candidate = candidate
        survey.maded = 0
        survey.timeless.save

        render json: { :success => "ok" }
    end

    def media
        survey = Survey.find(params[:id])

        content = survey.media.read
        if stale?(etag: content, last_modified: DateTime.new, public: true)
            send_data content, type: survey.media.file.content_type, disposition: "inline"
            expires_in 0, public: true
        end
    end
end
