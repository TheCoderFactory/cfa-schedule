class CreateEventIntakes < ActiveRecord::Migration
  def change
    create_table :event_intakes do |t|
      t.references :event, index: true, foreign_key: true
      t.references :intake, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
