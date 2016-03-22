Rails.application.routes.draw do
  devise_for :students, controllers: {
    sessions: "students/sessions",
    registrations: "students/registrations",
    passwords: "students/passwods"
  }
  devise_scope :student do
    get "students/new_student"  =>  "students/registrations#new"
  end

  devise_for :teachers, skip: [:registrations],  controllers: {
    sessions: "teachers/sessions",
    registrations: "teachers/registrations",
    passwords: "teachers/passwords"
  }

  root "dashboard#index"
end
