class WelcomeController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  
  def index
    @basic_plan = Plan.find(1)
    @pro_plan = Plan.find(2)
  end
  
end
