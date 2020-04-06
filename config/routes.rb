Rails.application.routes.draw do
  
  devise_for :users,
    #defaults: {
    #  format: :json
    #},
    path: '',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout'
    },
    controllers: {
      sessions: 'sessions'
    }  

  root to: 'site#index'

  namespace :api do
    namespace :v1, defaults: { format: 'json' } do
      resources :languages,           only: [:index, :show, :create, :update, :destroy]
      resources :shifts,              only: [:index, :show, :create, :update, :destroy]
      resources :users,               only: [:index, :create, :update]
    end
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
