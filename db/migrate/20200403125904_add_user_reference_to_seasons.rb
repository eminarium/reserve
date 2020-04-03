class AddUserReferenceToSeasons < ActiveRecord::Migration[5.2]
  def change
    add_reference :seasons, :user, foreign_key: true
  end
end
