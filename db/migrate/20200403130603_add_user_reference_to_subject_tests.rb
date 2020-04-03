class AddUserReferenceToSubjectTests < ActiveRecord::Migration[5.2]
  def change
    add_reference :subject_tests, :user, foreign_key: true
  end
end
