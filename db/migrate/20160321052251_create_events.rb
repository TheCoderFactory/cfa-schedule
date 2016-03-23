class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.text :description
      t.belongs_to :intake

      t.timestamps null: false
    end
  end
end
