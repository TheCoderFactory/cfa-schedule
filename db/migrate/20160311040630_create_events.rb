class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.references :event_type, index: true, foreign_key: true
      t.string :name
      t.text :description
      t.string :stame
      t.text :description
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
