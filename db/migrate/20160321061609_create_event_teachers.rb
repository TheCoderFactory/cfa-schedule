class CreateEventTeachers < ActiveRecord::Migration
  def change
    create_table :event_teachers do |t|
      t.belongs_to :event
      t.belongs_to :teacher

      t.timestamps null: false
    end
  end
end
