class CreateBrands < ActiveRecord::Migration
  def change
    create_table :brands do |t|
      t.string :email
      t.text :what_you_do
      t.text :why_you_do
      t.text :how_you_do
      t.text :target_audience
      t.text :competition_1
      t.text :proposition
      t.text :purpose
      t.text :personality
      t.text :market
      t.text :competition_2
      t.string :retrieval_key

      t.timestamps
    end
  end
end
