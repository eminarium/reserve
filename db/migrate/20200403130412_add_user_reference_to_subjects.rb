class AddUserReferenceToSubjects < ActiveRecord::Migration[5.2]
  def change
    add_reference :subjects, :user, foreign_key: true
  end
end
