class AddUserReferenceToSubjectCategories < ActiveRecord::Migration[5.2]
  def change
    add_reference :subject_categories, :user, foreign_key: true
  end
end
