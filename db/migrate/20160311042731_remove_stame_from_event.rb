class RemoveStameFromEvent < ActiveRecord::Migration
  def change
    remove_column :events, :stame, :string
  end
end
