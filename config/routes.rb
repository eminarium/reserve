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
      resources :seasons,             only: [:index, :show, :create, :update, :destroy]
      resources :subjects,            only: [:index, :show, :create, :update, :destroy]
      resources :subject_categories,  only: [:index, :show, :create, :update, :destroy]
      resources :subject_tests,       only: [:index, :show, :update, :destroy]
      resources :reservations,        only: [:index, :show, :update, :destroy, :report_list]
      resources :applicants,          only: [:index, :show, :create, :update, :destroy]
      resources :users,               only: [:index, :create, :update]

      resources :applicants do
        resources :subject_tests,         only: [:index, :show, :create, :update, :destroy]
        resources :reservations,          only: [:index, :show, :create, :update, :destroy]
      end

    end
  end

  get '*path', to: 'site#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
