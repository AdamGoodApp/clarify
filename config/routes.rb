Otter::Application.routes.draw do

  root 'welcomes#index'

  get '/login', to: 'brands#login'
  get '/logout', to: 'brands#logout'
  get '/retrieve_brands', to: 'brands#retrieve_brands'
  get '/checkemail', to: 'brands#check_email_on_update'
  get '/next-steps', to: 'high_voltage/pages#show', id: 'next_steps'

  resources :brands, only: [:show]

  scope 'api' do
    resources :brands, defaults: {format: :json}, only: [:index, :create, :update, :show] do
      member do
        get :send_email
        get :retrieve_brands
        get :send_update_email
      end
    end
  end

end