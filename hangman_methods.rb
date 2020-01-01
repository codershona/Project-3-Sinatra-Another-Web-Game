module Hangman

  def check_params(language, length)
    msg = "ok"
    if ((length.to_i).between?(4,10))
      if language == "none"
        msg = "You need to select a language"
      elsif language != "en" and language != "ru"
        msg = "Don't do that."
      end
    else
      msg = "Don't do that."
    end
    msg
  end

  def get_random_word(language, length)
    filepath = ""
    if language == "en"
      filepath = "public/dictionary/en/"
    else
      filepath = "public/dictionary/ru/"
    end
    filepath += length + ".txt"
    random_word = ""
    File.open(filepath) do |file|
      file_lines = file.readlines()
      random_word = file_lines[Random.rand(0...file_lines.size())]
    end
    random_word.upcase
  end

  def guess(char)
    ind = session[:word].index(char)
    if ind == nil
      session[:attempts_left] -= 1
    else
      indices = (0 ... session[:word].length).find_all { |i| session[:word][i] == char }
      indices.each do |ind|
        session[:dashes][ind] = char
      end
    end
  end
end