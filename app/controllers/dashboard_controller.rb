class DashboardController < ApplicationController
  before_action :authorize_teacher, only: [:admin]
  def index
  end

  def admin
  end
end
