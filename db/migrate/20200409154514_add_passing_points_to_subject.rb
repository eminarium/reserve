class AddPassingPointsToSubject < ActiveRecord::Migration[5.2]
  def change
    add_column :subjects, :passing_points, :float
  end
end
