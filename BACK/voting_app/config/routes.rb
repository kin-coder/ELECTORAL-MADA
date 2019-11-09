Rails.application.routes.draw do
  get '/api/voters', to: 'api_voter#all_voters'
  get '/api/voters/:search', to: 'api_voter#search_voters'
  get '/api/test', to: 'api_voter#voter_test'
  get '/oauth/authorize/:entitled/:secret', to: 'oauth_application#authorize'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
