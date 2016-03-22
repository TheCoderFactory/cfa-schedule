class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def authorize_teacher
    return unless !teacher_signed_in?
    redirect_to new_teacher_session_path, alert: 'Teachers only!'
  end
end
