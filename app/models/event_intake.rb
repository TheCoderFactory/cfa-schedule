# == Schema Information
#
# Table name: event_intakes
#
#  id         :integer          not null, primary key
#  event_id   :integer
#  intake_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class EventIntake < ActiveRecord::Base
  belongs_to :event
  belongs_to :intake
end
