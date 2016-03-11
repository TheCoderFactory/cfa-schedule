class CreateEventTypes < ActiveRecord::Migration
  def change
    create_table :event_types do |t|
      t.string :name
      t.text :description
      t.string :icon
      t.string :color

      t.timestamps null: false
    end
  end
end
