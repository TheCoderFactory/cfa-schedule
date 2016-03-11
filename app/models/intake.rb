# == Schema Information
#
# Table name: intakes
#
#  id               :integer          not null, primary key
#  name             :string
#  term_one_start   :date
#  term_one_end     :date
#  term_two_start   :date
#  term_two_end     :date
#  term_three_start :date
#  term_three_end   :date
#  term_four_start  :date
#  term_four_end    :date
#  color            :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#

class Intake < ActiveRecord::Base
  has_many :event_intakes
  has_many :events, through: :event_intakes

  validates :name, presence: true
end
