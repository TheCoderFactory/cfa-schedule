# == Schema Information
#
# Table name: teachers
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  name       :string
#  image      :string
#  bio        :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Teacher < ActiveRecord::Base
  belongs_to :user
end
