require 'sinatra'
require 'sinatra/reloader' if development?
require_relative "hangman_methods"
include Hangman

enable :sessions

get '/' do
  @session = session
  session[:word] = ""
  session[:attempts_left] = -1
  session[:language] = ""
  session[:dashes] = ""
  session[:set] = false
  erb :index, :locals => {}
end

get '/settings' do
  msg = ""
  if(params.has_key?(:language) && params.has_key?(:length))
    language = params["language"]
    length = params["length"]
    msg = check_params(language, length)
    if msg == "ok"
      session[:language] = language
      session[:word] = get_random_word(language,length)
      session[:attempts_left] = 8
      session[:dashes] = ""
      i = 2
      until i > session[:word].length do
        session[:dashes] += "_"
        i += 1
      end
      session[:set] = true
      redirect "/game"
    end
  end
  erb :settings, :locals => {:msg => msg}
end