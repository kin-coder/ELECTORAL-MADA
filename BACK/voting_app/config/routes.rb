Rails.application.routes.draw do
  resources :unlocks, controller: 'rails_jwt_auth/unlocks', only: %i[update]
  resources :invitations, controller: 'rails_jwt_auth/invitations', only: [:create, :update]
  resources :passwords, controller: 'rails_jwt_auth/passwords', only: [:create, :update]
  resources :confirmations, controller: 'rails_jwt_auth/confirmations', only: [:create, :update]
  resources :registration, controller: 'rails_jwt_auth/registrations', only: [:create, :update, :destroy]
  resources :session, controller: 'rails_jwt_auth/sessions', only: [:create, :destroy]

  get '/api/voters', to: 'api_voter#all_voters'
  get '/api/voters/:search', to: 'api_voter#search_voters'
  post '/api/voters/create', to: 'api_voter#create_voter'
  # get '/api/test', to: 'api_voter#voter_test'
  # get '/oauth/authorize/:entitled/:secret', to: 'oauth_application#authorize'
  post '/api/session_vote/begin', to: 'api_vote_manager#begin_session'
  post '/api/session_vote/check', to: 'api_vote_manager#check_session_vote'
  post '/api/session_vote/end', to: 'api_vote_manager#end_session'

  get '/api/candidates', to: 'candidate_manager#all_candidates'
  get '/api/candidates/general_stat', to: 'candidate_manager#all_vote_details'
  post '/api/candidates/create', to: 'candidate_manager#create_candidate'

  get '/surveys', to: 'survey#all'
  get '/survey/show/:id', to: 'survey#show'
  post '/surveys/create', to: 'survey#create'
  get '/survey/media/:id', to: 'survey#media'

  # post '/api/test_upload', to: 'test_api#test_upload'
  # get '/test_get_file', to: 'test_api#serve_file'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
