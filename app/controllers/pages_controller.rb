class PagesController < ApplicationController
  skip_before_action :authenticate_user!, except: :admin
  layout 'dashboard', only: :dashboard
  def home
    @intakes = Intake.all
    @event_times = EventTime.this_week.includes(:event)
  end

  def admin
  end

  def contact
  end

  def dashboard
  end
end
